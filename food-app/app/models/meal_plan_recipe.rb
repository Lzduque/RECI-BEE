class MealPlanRecipe < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :meal_plan
end
