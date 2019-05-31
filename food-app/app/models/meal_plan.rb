class MealPlan < ApplicationRecord
  belongs_to :user
  has_many :recipes, :through => :meal_plan_recipes

  def index
  end

  def create
  end

  def destroy
  end
end
