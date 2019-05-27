class RecipesController < ApplicationController
  # before_action :set_recipe

  def index
    render(
      status: 200,
      #User is name of model not table
      #When searching with curl: localhost:3001/api/users?name=test
      json: Recipe.all
    )
  end

  # POST /lists
  def create
    @recipe = Recipe.new(params_recipe)

    if @recipe.save
      render json: @recipe
    else
      render json: @recipe.errors
    end
  end


  private
    # # Use callbacks to share common setup or constraints between actions.
    # def set_recipe
    #   @recipe = Recipe.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def params_recipe
      params.require(:recipe).permit(:name, :image, :servings, :time, :preparation, :meal_type)
    end

    def params_ingredients
      params.require(:recipe).permit(:ingredients)
    end
end
