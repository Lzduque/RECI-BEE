class BooksController < ApplicationController
  # before_action :set_recipe
  before_filter :new_book, :only => [:create]

  def index
    @user_id = 1
    @books = Book.where(['user_id = ?', @user_id]).order(:recipe_id)
    render :json => @books.to_json(:include => {recipe: {:include => {ingredients: {include: :quantities}}}})
  end

  # VIEWRECIPE - GET/ - books/:recipe_id - to check recipe in Db for a user --> to render saved button state
  def show
    puts "show method"

    @recipe_id = params[:id]
    @user_id = 1

    if Book.where(['recipe_id = ? AND user_id = ?', @recipe_id, @user_id]).first
      puts "Recipe is already saved for this user"
      render json: true
    else
      puts "Recipe is NOT saved for this user"
      render json: false
    end
  end

#MEALPLAN - GET/ - /books - to see all saved recipes for a user ---> to render saved recipes carousel
  def search
    search = params[:type]
    if search.blank?
      render status: 400, json: { error: 'Expected parameter `type`' }
    else

      @books = Book.joins(:recipe).where(["meal_type = ?", search])
      @user_id = 1
      render :json => @books.to_json(:include => {recipe: {:include => {ingredients: {include: :quantities}}}})
    end
  end

  # VIEWRECIPE - POST/ - books/:recipe_id - to save recipe in Db for a user --> save button
  def create
    puts "create method"
    @user_id = 1

    @recipe_id = params[:id]

    if Book.where(['recipe_id = ? AND user_id = ?', @recipe_id, @user_id]).first
      render status: 400, json: { error: 'Recipe is already saved to this user in DB!' }
    elsif @book.save
      render status: 200, json: @book
    else
      render status: 400, json: { error: 'Expected parameter `queryArr`' }
    end
  end

  # VIEWRECIPE - DELETE/ - books/:recipe_id - to remove recipe in Db for a user --> unsave button
  def destroy
    @recipe_id = params[:id]
    @user_id = 1

    @delete = Book.where(['recipe_id = ? AND user_id = ?', @recipe_id, @user_id]).first
    @delete.destroy
  end

  private
  def books_params
    @recivedParams = params.require(:id)
    @newParams = { "recipe_id" => @recivedParams, "user_id" => 1 }
  end

  protected
  def new_book
    @book = Book.new(books_params)
  end
end
