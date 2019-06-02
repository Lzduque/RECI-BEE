class Recipe < ActiveRecord::Base

  has_many :quantities
  has_many :ingredients, :through => :quantities
  has_many :books
  has_many :users, :through => :books
  has_many :meal_plans, :through => :meal_plan_recipes

end
