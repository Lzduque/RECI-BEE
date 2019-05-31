class CreateMealPlanRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :meal_plan_recipes do |t|
      t.references :recipe, foreign_key: true
      t.references :meal_plan, foreign_key: true

      t.timestamps
    end
  end
end
