class QuantitiesController < ApplicationController

  def index
    render json: Recipe.find(params[:recipe_id]).quantities.all
  end

  private
  def quantity_params
    params.permit(:recipe_id, :ingredient_id, :quantity)
  end

end