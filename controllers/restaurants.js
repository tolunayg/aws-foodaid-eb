const { client, getDb } = require('../mongodb');

exports.getAll = async (req, res) => {
  try {
    const restaurants = await req.db.collection('restaurants').find().toArray();
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const restaurant = await req.db.collection('restaurants').findOne({ restaurant_id: req.params.id });
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.status(200).json(restaurant);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.create = async (req, res) => {
  try {
    const newRestaurant = req.body;
    const result = await req.db.collection('restaurants').insertOne(newRestaurant);
    newRestaurant._id = result.insertedId;
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedRestaurant = await req.db.collection('restaurants').findOneAndUpdate(
      { restaurant_id: req.params.id },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!updatedRestaurant.value) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.status(200).json(updatedRestaurant.value);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedRestaurant = await req.db.collection('restaurants').findOneAndDelete({ restaurant_id: req.params.id });
    if (!deletedRestaurant.value) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


/** 
 * Model tanimladik fakat bu modelin disina cikmak, modelde tanimli olmayan attribute'lari vermek ve
 * db'ye eklemek mumkun. Modelde tanimli olmayan alanlari kullanmak istedigimizde toObject() diyerek
 * plain JavaScript objesini elde ederiz, modelde tanimli olmayan attribute'larina da . diyerek ulasabiliriz.
 * 
 * Ornek:
 * 
 * const restaurant = new Restaurant({
  name: 'Pizza Place',
  location: {
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA'
  },
  rating: 4.5,
  tags: ['pizza', 'Italian', 'delivery'],
  deliveryTime: 45 // this field is not in the model
});

restaurant.save();

console.log(restaurant.toObject().deliveryTime); // outputs 45
 * 
 *  */ 

