class BooksController < ApplicationController
  # before_action :set_recipe
  @current_user = '1'

  # query all recipes from user --> to render saved recipes
  def show
    # byebug
    puts params
    puts params[:id]
    @recipe_id = params[:id]

    @recipesFromUser = Book.where(["recipe_id = ?", @recipe_id]).first
    puts "@recipesFromUser"
    puts @recipesFromUser

    if @recipesFromUser then
      render json: 'true'
    else
      render json: 'false'
    end
  end

end
