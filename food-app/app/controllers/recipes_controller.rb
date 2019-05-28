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
    # byebug
    puts 'params_recipe'
    puts params_recipe
    @newRecipe = Recipe.new(params_recipe)

    if @newRecipe.save
      render json: @newRecipe
    else
      render json: @newRecipe.errors
    end

    puts '@newRecipe'
    pp @newRecipe

    puts '@newRecipe.id'
    puts @newRecipe.id

    puts 'params ingredients'
    puts params[:ingredients]

    params[:ingredients].each do |ingredient|
      puts 'ingredient'
      puts ingredient
      newQuantity = { "recipe_id" => @newRecipe.id, "ingredient_id" => ingredient[:ingredientId], "quantity" => ingredient[:ingredientQt] }
      puts "newQuantity"
      puts newQuantity


    end

    # @newRecipe.ingredients.create(params[:ingredients])

  end


  private
    # # Use callbacks to share common setup or constraints between actions.
    # def set_recipe
    #   @recipe = Recipe.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def params_recipe
      params.permit(:name, :image, :servings, :time, :preparation, :meal_type)
    end

    # def params_ingredients
    #   params.permit(:ingredients)
    # end
end
