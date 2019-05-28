class RecipesController < ApplicationController
  # before_action :set_recipe

  def index
    @recipe = Recipe.all
     render json: @recipe
  end

  # POST /lists
  def create
    @recipe = Recipe.new(params)

    if @recipe.save
      render json: @recipe, status: :created
      alert('A recipe was created: ' + this.state.recipeTitle);
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # def search
  #   @result = Recipe.where
  # end

    private
      # # Use callbacks to share common setup or constraints between actions.
      # def set_recipe
      #   @recipe = Recipe.find(params[:id])
      # end

      # Only allow a trusted parameter "white list" through.
      def params
        params.require(:recipe).permit(:name, :image, :servings, :time, :preparation, :meal_type, :ingredients)
      end
  end

