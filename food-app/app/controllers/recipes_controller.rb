class RecipesController < ApplicationController

  # SAVEDRECIPES - GET/ - recipes - to get all recipes for the user --> to render saved recipes
  def index
    @recipes = Recipe.all

    render :json => @recipes.to_json(:include => {ingredients: {include: :quantities}})
  end

  # RECIPEBOOK - GET/ - recipes/search - to get meals types out of all recipes --> to render search recipes
  def search
    search = params[:queryArr].split(",").map { |l| l.downcase }
    if search.blank?
      render status: 400, json: { error: 'Expected parameter `queryArr`' }
    else
      @recipes = Recipe.where(["meal_type IN (?)", search]).limit(20)
      render json: @recipes.to_json(:include => {ingredients: {include: :quantities}})
    end
  end

  # CREATERECIPE - POST/ - recipes/ - to create new recipe connected to a user and new quantities --> to create recipe button
  def create
    @newRecipe = Recipe.new(params_recipe)

    if @newRecipe.save
      render json: @newRecipe
    else
      render json: @newRecipe.errors
    end

    @user_id = 1

    @newParams = { "recipe_id" => @newRecipe.id, "user_id" => @user_id }
    @book = Book.new(@newParams)

    @book.save

    params[:ingredients].each do |ingredient|
      puts 'ingredient'
      puts ingredient
      newQuantity = { "recipe_id" => @newRecipe.id, "ingredient_id" => ingredient[:ingredientId], "quantity" => ingredient[:ingredientQt] }
      puts "newQuantity"
      puts newQuantity

      @quantity = Quantity.new(newQuantity)
      @quantity.save
    end
  end


  private
    # Only allow a trusted parameter "white list" through.
    def params_recipe
      params.permit(:name, :image, :servings, :time, :preparation, :meal_type)
    end
end
