class RecipesController < ApplicationController
  # before_action :set_recipe

  # SAVEDRECIPES - GET/ - recipes - to get all recipes for the user --> to render saved recipes
  def index
    @recipes = Recipe.all

    # pp @recipes

    render :json => @recipes.to_json(:include => {ingredients: {include: :quantities}})
  end

  # RECIPEBOOK - GET/ - recipes/search - to get meals types out of all recipes --> to render search recipes
  def search
    # byebug
    puts 'params[:queryArr]'
    puts params[:queryArr]
    search = params[:queryArr].split(",").map { |l| l.downcase }
    if search.blank?
      render status: 400, json: { error: 'Expected parameter `queryArr`' }
    else

    # params["search"] # -> {q: "veggie"}
      @recipes = Recipe.where(["meal_type IN (?)", search]).limit(10)
      render json: @recipes
    end
  end

  # CREATERECIPE - POST/ - recipes/ - to create new recipe connected to a user and new quantities --> to create recipe button
  def create
    # byebug
    puts 'params_recipe'
    puts params_recipe
    @newRecipe = Recipe.new(params_recipe)
    pp @newRecipe

    if @newRecipe.save
      render json: @newRecipe
    else
      render json: @newRecipe.errors
    end

    @user_id = 1
    puts '@user_id'
    pp @user_id

    puts '@newRecipe'
    pp @newRecipe

    puts '@newRecipe.id'
    puts @newRecipe.id

    @newParams = { "recipe_id" => @newRecipe.id, "user_id" => @user_id }
    @book = Book.new(@newParams)

    @book.save

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
