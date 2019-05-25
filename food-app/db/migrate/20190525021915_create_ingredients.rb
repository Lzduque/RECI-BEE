class CreateIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.string :unit
      t.string :food_type

      t.timestamps
    end
  end
end
