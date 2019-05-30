class BooksController < ApplicationController
  # before_action :set_recipe
  before_filter :new_book, :only => [:create]

  # VIEWRECIPE - GET/ - books/:recipe_id - to check recipe in Db for a user --> to render saved button state
  def show
    # byebug
    puts "show method"

    @recipe_id = params[:id]
    @user_id = 1
    # puts "params[:id]"
    # puts params[:id]
    puts "@recipe_id"
    puts @recipe_id
    puts "@user_id"
    puts @user_id

    if Book.where(['recipe_id = ? AND user_id = ?', @recipe_id, @user_id]).first
      puts "Recipe is already saved for this user"
      render json: true
    else
      puts "Recipe is NOT saved for this user"
      render json: false
    end
  end

  # VIEWRECIPE - POST/ - books/:recipe_id - to save recipe in Db for a user --> save button
  def create
    puts "create method"
    @user_id = 1

    puts params
    puts params[:id]
    @recipe_id = params[:id]

    # @book = { "recipe_id" => @recipe_id, "user_id" => 1 }
    # @book.recipe_id = @recipe_id
    # @book.user_id = 1

    puts "@book"
    pp @book

    if Book.where(['recipe_id = ? AND user_id = ?', @recipe_id, @user_id]).first
      puts "Book.where('recipe_id = @recipe_id AND user_id = @user_id').first"
      puts Book.where('recipe_id = @recipe_id AND user_id = @user_id').first
      puts '@recipe_id'
      puts @recipe_id
      puts '@user_id'
      puts @user_id

      render status: 400, json: { error: 'Recipe is already saved to this user in DB!' }
    elsif @book.save
      render status: 200, json: @book
    else
      render status: 400, json: { error: 'Expected parameter `queryArr`' }
    end
  end

  # VIEWRECIPE - DELETE/ - books/:recipe_id - to remove recipe in Db for a user --> unsave button
  def destroy
    puts "destroy method"
    puts 'params'
    puts params
    puts 'params[:id]'
    puts params[:id]
    @recipe_id = params[:id]
    @user_id = 1
    puts '@recipe_id'
    puts @recipe_id
    puts '@user_id'
    puts @user_id

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
