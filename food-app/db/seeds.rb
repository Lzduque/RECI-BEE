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

ing8 = Ingredient.create!({
  name:      "dates",
  unit:      "whole",
  food_type: "fruit"
})

ing9 = Ingredient.create!({
  name:      "oats",
  unit:      "g",
  food_type: "grain"
})

ing10 = Ingredient.create!({
  name:      "almond butter",
  unit:      "mL",
  food_type: "other"
})

ing11 = Ingredient.create!({
  name:      "ground flaxseed",
  unit:      "g",
  food_type: "grain"
})

ing12 = Ingredient.create!({
  name:      "ground cinnamon",
  unit:      "g",
  food_type: "spice"
})

ing13 = Ingredient.create!({
  name:      "yogurt",
  unit:      "mL",
  food_type: "dairy"
})

ing14 = Ingredient.create!({
  name:      "frozen berries",
  unit:      "g",
  food_type: "fruit"
})

# RECIPES

puts "Re-creating Recipes ..."

rec1 = Recipe.create!({
  name:        "Roasted Cauliflower Lentil Curry",
  image:       "https://static.wixstatic.com/media/26357d_c27847b36be6429ba735bd715378bd59~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_c27847b36be6429ba735bd715378bd59~mv2_d_6000_4000_s_4_2.webp",
  servings:    6,
  time:        70,
  preparation: "\n 1. Preheat the oven to 400 F/ 210 C. \n 2. Toss the cauliflower with the oil and spices until coated. \n 3. Spread evenly on a baking tray lined with baking paper or tinfoil. \n 4. Roast for 40-50 minutes, until crispy and golden, stopping to mix once halfway. \n 5. In a large pot on medium heat, cook the onions in the oil, until soft and slightly golden. \n 6. Add splashes of water if needed to prevent burning or sticking in the pot. \n 7. Once soft, add the garlic and all the spices, and stir until fragrant (about 1 minutes). \n 8. Add the can of tomatoes and diced tomatoes, and stir to combine everything. \n 9. Allow to simmer for 5 minutes. \n 10. Finally, add the coconut milk, lentils, spinach, and roasted cauliflower, and mix until everything is combined and heated through, about 5 minutes. \n 12. Serve with rice, and enjoy!",
  meal_type:   "meal"
})

rec2 = Recipe.create!({
  name:        "Frozen Yogurt Breakfast Bars",
  image:       "https://static.wixstatic.com/media/26357d_90b4cade532243748568d864fbc229f9~mv2_d_3582_5373_s_4_2.jpg/v1/fill/w_1260,h_1890,al_c,q_90,usm_0.66_1.00_0.01/26357d_90b4cade532243748568d864fbc229f9~mv2_d_3582_5373_s_4_2.webp",
  servings:     8,
  time:         15,
  preparation:  "\n 1. First, stew the berries until soft, set aside to cool. \n 2. In a food processor, blend the dates until they are smooth, scraping down the sides as needed. Add the oatmeal, ground flaxseed, almond butter, and cinnamon and combine, scraping down the sides once or twice. \n 3. Transfer the mix to a parchment lined baking dish and press the base into the dish. \n 4. Top with the yogurt and spread out evenly. \n 5. Dot the yogurt with the stewed berries and use a knife to swirl. \n 6. Place into the freezer and let freeze for 1-2 hours, or until the bars are solid enough to cut. \n 7. When removed from the freezer, cut into squares or bars of desired size. \n 8. Let thaw for 3-5 minutes before eating. Enjoy!",
  meal_type:    "breakfast"
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

q8 = Quantity.create!({
  ingredient_id: ing8.id,
  recipe_id:     rec2.id,
  quantity:      12
})

q9 = Quantity.create!({
  ingredient_id: ing9.id,
  recipe_id:     rec2.id,
  quantity:      180
})

q10 = Quantity.create!({
  ingredient_id: ing10.id,
  recipe_id:     rec2.id,
  quantity:      250
})

q11 = Quantity.create!({
  ingredient_id: ing11.id,
  recipe_id:     rec2.id,
  quantity:      28
})

q12 = Quantity.create!({
  ingredient_id: ing12.id,
  recipe_id:     rec2.id,
  quantity:      5
})

q13 = Quantity.create!({
  ingredient_id: ing13.id,
  recipe_id:     rec2.id,
  quantity:      375
})

q14 = Quantity.create!({
  ingredient_id: ing14.id,
  recipe_id:     rec2.id,
  quantity:      100
})


# BOOKS

puts "Re-creating BOOKS ..."

b1 = Book.create!({
  user_id:    user1.id,
  recipe_id:  rec1.id
})

