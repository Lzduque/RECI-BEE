class RecipesController < ApplicationController
  # before_action :set_recipe

  # query all recipes from user --> to render saved recipes
  def index
    @recipe = Recipe.all
     render json: @recipe
    # render(
    #   status: 200,
    #   #User is name of model not table
    #   #When searching with curl: localhost:3001/api/users?name=test
    #   json: Recipe.all
    # )
  end

  # GET/search - just to get meals out of all reciepes --> to render search recipes
  def search
    # byebug
    puts 'params[:queryArr]'
    puts params[:queryArr]
    search = params[:queryArr].split(",").map { |l| l.downcase }
    if search.blank?
      render status: 400, json: { error: 'Expected parameter `queryArr`' }
    else

    # params["search"] # -> {q: "veggy"}
      @recipes = Recipe.where(["meal_type IN (?)", search]).limit(10)
      render json: @recipes
    end
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

      @quantity = Quantity.new(newQuantity)
      @quantity.save
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
