# HELPER FUNCTION FOR IMAGES

# def open_asset(file_name)
#   File.open(Rails.root.join('db', 'seed_assets', file_name))
# end

# # Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Dropping all table data"

User.destroy_all
Ingredient.destroy_all
Recipe.destroy_all
Quantity.destroy_all
Book.destroy_all

puts "Seeding Data ..."

# TEST

user1 = User.create!({ name: "test" })

# INGREDIENTS

puts "Re-creating Ingredients ..."

ing1 = Ingredient.create!({
  name:      "cauliflower",
  unit:      "head",
  food_type: "vegetable"
})

ing2 = Ingredient.create!({
  name:      "vegetable oil",
  unit:      "mL",
  food_type: "other"
})

ing3 = Ingredient.create!({
  name:      "garlic powder",
  unit:      "g",
  food_type: "spice"
})

ing4 = Ingredient.create!({
  name:      "onion powder",
  unit:      "g",
  food_type: "spice"
})

ing5 = Ingredient.create!({
  name:      "paprika powder",
  unit:      "g",
  food_type: "spice"
})

ing6 = Ingredient.create!({
  name:      "salt",
  unit:      "g",
  food_type: "spice"
})

ing7 = Ingredient.create!({
  name:      "black pepper",
  unit:      "g",
  food_type: "spice"
})

# RECIPES

puts "Re-creating Recipes ..."

rec1 = Recipe.create!({
  name:        "Roasted Cauliflower Lentil Curry",
  image:       "rec1.jpg",
  servings:    6,
  time:        70,
  preparation: "1. Preheat the oven to 400 F/ 210 C. Toss the cauliflower with the oil and spices until coated. Spread evenly on a baking tray lined with baking paper or tinfoil. Roast for 40-50 minutes, until crispy and golden, stopping to mix once halfway. 2. In a large pot on medium heat, cook the onions in the oil, until soft and slightly golden. Add splashes of water if needed to prevent burning or sticking in the pot. Once soft, add the garlic and all the spices, and stir until fragrant (about 1 minutes). 3. Add the can of tomatoes and diced tomatoes, and stir to combine everything. Allow to simmer for 5 minutes. 4. Finally, add the coconut milk, lentils, spinach, and roasted cauliflower, and mix until everything is combined and heated through, about 5 minutes. Serve with rice, and enjoy!",
  meal_type:   "meal"
})

# QUANTITIES

puts "Re-creating Quantities ..."

q1 = Quantity.create!({
  ingredient_id: ing1.id,
  recipe_id:     rec1.id,
  quantity:      1.0
})

q2 = Quantity.create!({
  ingredient_id: ing2.id,
  recipe_id:     rec1.id,
  quantity:      15.0
})

q3 = Quantity.create!({
  ingredient_id: ing3.id,
  recipe_id:     rec1.id,
  quantity:      5.0
})

q4 = Quantity.create!({
  ingredient_id: ing4.id,
  recipe_id:     rec1.id,
  quantity:      5.0
})

q5 = Quantity.create!({
  ingredient_id: ing5.id,
  recipe_id:     rec1.id,
  quantity:      1.5
})

q6 = Quantity.create!({
  ingredient_id: ing6.id,
  recipe_id:     rec1.id,
  quantity:      0.75
})

q7 = Quantity.create!({
  ingredient_id: ing7.id,
  recipe_id:     rec1.id,
  quantity:      0.75
})

# BOOKS

puts "Re-creating BOOKS ..."

b1 = Book.create!({
  user_id:    user1.id,
  recipe_id:  rec1.id
})

