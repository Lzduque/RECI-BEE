class IngredientsController < ApplicationController

  # CREATERECIPE - GET/ - ingredients/ - to render all ingredients in Db --> to render select elements
  def index
    render json: Ingredient.all
  end

  private
  def ingredient_params
    params.permit(:name, :unit, :food_type)
  end
end

