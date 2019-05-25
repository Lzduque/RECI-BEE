class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :image
      t.integer :servings
      t.integer :time
      t.text :preparation
      t.string :meal_type

      t.timestamps
    end
  end
end
