class MealPlan < ActiveRecord::Base
  belongs_to :user
  has_many :meal_plan_recipes
end
