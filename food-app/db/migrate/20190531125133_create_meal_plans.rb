class CreateMealPlans < ActiveRecord::Migration[5.0]
  def change
    create_table :meal_plans do |t|
      t.references :user, foreign_key: true
      t.datetime :meal_plan_date

      t.timestamps
    end
  end
end
