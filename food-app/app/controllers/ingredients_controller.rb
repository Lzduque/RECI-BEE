class IngredientsController < ApplicationController

#this is needed for the create recipe component
  # def index
  #   render(
  #     status: 200,
  #     #When searching with curl: localhost:3001/api/users?name=test
  #     json: Ingredient.all
  #   )
  # end

    # #this needs to be under index to fill out recipes' ingredient's list???
  def index
    render json: Recipe.find(params[:recipe_id]).ingredients.all
  end

  private
  def ingredient_params
    params.permit(:name, :unit, :food_type)
  end
end

