const Farmer = require("../model/farmerModel");
const { ObjectId } = require("mongodb");
const path = require("path");

const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");

exports.signupFramer = async (req, res, next) => {
  try {
    let userEmail = await Farmer.findOne({
      email: req.body.email,
    });
    if (!userEmail) {
      const keyLocation = path.join(__dirname, "../gcbkey.json");
      const storage = new Storage({
        projectId: "selinasapp",
        keyFilename: keyLocation,
      });

      const bucket = storage.bucket("grocery-shopping-app");
      const imageName = Date.now() + req.file.originalname;
      const bucketFile = bucket.file(imageName);

      const stream = bucketFile.createWriteStream({
        metadata: { contentType: req.file.mimetype },
        public: true,
      });

      stream.end(req.file.buffer);
      const logoUrl = `https://storage.cloud.google.com/grocery-shopping-app/${imageName}`;

      stream.on("finish", async () => {
        const newUser = new Farmer({
          ...req.body,
          logo: logoUrl,
        });

        await newUser.save();
        res.status(201).json({ messege: "User registered" });
      });
    } else {
      res.status(409).json({
        status: "failed",
        messege: "Email already exist, Please try a with a different email",
      });
    }
  } catch (err) {
    res.json({ messege: "Error found...", error: err.messege });
  }
};

exports.signinFarmer = async (req, res, next) => {
  const { email, password } = req.body;
  //user is a promise so use async/await
  let user = await Farmer.findOne({ email: email, password: password });

  try {
    if (!email || !password) {
      return res.json({
        status: "failed",
        messege: "Please enter your email and password",
      });
    }

    if (!user || password != user.password) {
      return res.json({
        status: "failed",
        messege: "Wrong email or password",
      });
    }

    if (user) {
      //since email and password are sensitive informations, don't put them in the headers and payload
      //because the can be easily decoded.so use like _id from backend
      if (user["active"] == "Active") {
        let token = jwt.sign({ id: user._id }, "I am strong, I can do it!!!");
        res.status(200).json({
          status: "ok",
          messege: "signed in",
          token: token,
          role: user.role,
        });
      } else {
        res.status(200).json({
          status: "failed",
          messege: "No user account Found!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//add product by a farmer under his/her account
exports.addProducts = async (req, res, next) => {
  try {
    let product = await Farmer.findOne({
      "products.itemName": req.body.itemName,
    });

    if (!product) {
      const keyLocation = path.join(__dirname, "../gcbkey.json");
      const storage = new Storage({
        projectId: "selinasapp",
        keyFilename: keyLocation,
      });

      const bucket = storage.bucket("grocery-shopping-app");
      const imageName = Date.now() + req.file.originalname;
      const bucketFile = bucket.file(imageName);

      const stream = bucketFile.createWriteStream({
        metadata: { contentType: req.file.mimetype },
        public: true,
      });

      stream.end(req.file.buffer);

      const imageUrl = `https://storage.cloud.google.com/grocery-shopping-app/${imageName}`;

      stream.on("finish", async () => {
        await Farmer.updateOne(
          { _id: ObjectId(req.user._id) },
          { $push: { products: { ...req.body, image: imageUrl } } }
        );
        res
          .status(201)
          .json({ status: "ok", messege: "Product successfully added" });
      });
    } else {
      product.products.map((items) => {
        if (items.itemName == req.body.itemName) {
          items.inventory += +req.body.inventory;
        }
      });

      product.save();

      res
        .status(201)
        .json({ status: "ok", messege: "Product successfully added" });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error: error.messege,
    });
  }
};

//reset paassword
exports.resetPassword = async (req, res, next) => {
  try {
    await Farmer.updateOne(
      {
        _id: ObjectId(req.user._id),
      },
      {
        $set: {
          password: req.body.newPassword,
        },
      }
    );

    res
      .status(200)
      .json({ status: "ok", messege: "Password successfully changed!" });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//forget password and create a new password
exports.forgetPassword = async (req, res, next) => {
  try {
    let user = await Farmer.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } }
    );

    res
      .status(200)
      .json({ status: "ok", messege: "Password successfully Created!" });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//get only his/her own products under his/her account as an inventory
exports.getProducts = async (req, res, next) => {
  try {
    let farmerId = await Farmer.findOne({
      _id: ObjectId(req.user._id),
    });

    res.status(200).json({ status: "ok", data: farmerId.products });
  } catch (error) {
    res.status(500).send({ messege: "Error found....", Error: error.messege });
  }
};

//delete product by a farmer only his/her own product under his/her account
exports.deleteProduct = async (req, res, next) => {
  try {
    let farmer = await Farmer.findOne({
      _id: ObjectId(req.user._id),
    });

    farmer.products = farmer.products.filter(
      (item) => item._id != req.params.id
    );
    await farmer.save();
    res.status(200).json({ status: "okay", messege: "succesfully deleted" });
  } catch (error) {
    res.status(500).send({ messege: "Error found....", Error: error.messege });
  }
};

//edit product by a farmer only his/her own product under his/her account
exports.editProduct = async (req, res, next) => {
  const { companyId, itemName, image, price, inventory, detail } = req.body;
  try {
    let product = await Farmer.updateOne(
      {
        _id: ObjectId(req.user._id),
        products: { $elemMatch: { _id: ObjectId(req.params.id) } },
        // "products._id": ObjectId(req.params.id),
      },
      {
        $set: {
          "products.$.itemName": itemName,
          "products.$.image": image,
          "products.$.price": price,
          "products.$.inventory": inventory,
          "products.$.detail": detail,
        },
      }
    );

    res
      .status(200)
      .json({ status: "ok", messege: "Product successfully updated" });
  } catch (error) {
    res.status(500).send({ messege: "Error found....", Error: error.messege });
  }
};
