class MealPlansController < ApplicationController
  before_filter :new_meal_plan, :only => [:create]

  def index
    render json: MealPlan.all
  end

  def create
    puts "create method"

    @user_id = 1
    @meal_plan_date = Time.zone.today

    @recipe_id = params[:recipe_id]

    @mealPlanParams = { "recipe_id" => @recipe_id,  "meal_plan_date" => @meal_plan_date }

    @meal_plan = MealPlan.new(@mealPlanParams)
    puts "@meal_plan"
    pp @meal_plan

  if MealPlan.where(['meal_plan_date = ? AND user_id = ?', @meal_plan_date, @user_id]).first
      puts "MealPlan.where(['meal_plan_date = ? AND user_id = ?', @meal_plan_date, @user_id]).first"
      puts MealPlan.where(['meal_plan_date = ? AND user_id = ?', @meal_plan_date, @user_id]).first

      puts '@meal_plan_date'
      puts @meal_plan_date
      puts '@user_id'
      puts @user_id

      render status: 400, json: { error: 'Meal Plan already exists to this user in DB!' }
    elsif @meal_plan.save
      render status: 200, json: @meal_plan
    else
      render status: 400, json: { error: 'Expected parameter `recipe_id and meal_type`' }
    end

    puts "@meal_plan.id"
    puts @meal_plan.id
    puts "@recipe_id"
    puts @recipe_id

    @mealPlanRecipeParams = { "meal_plan_id" => @meal_plan.id,  "recipe_id" => @recipe_id }

    @meal_plan_recipe = MealPlanRecipe.new(@mealPlanRecipeParams)

    @meal_plan_recipe.save

    puts "@meal_plan_recipe"
    puts @meal_plan_recipe

  end

  def destroy
    puts "destroy method"
    puts 'params'
    puts params
    puts 'params[:recipe_id]'
    puts params[:recipe_id]
    puts 'params[:meal_plan_id]'
    puts params[:meal_plan_id]

    @recipe_id = params[:recipe_id]
    @meal_plan_id = params[:meal_plan_id]

    puts '@recipe_id'
    puts @recipe_id
    puts '@user_id'
    puts @user_id

    @delete = MealPlanRecipe.where(['recipe_id = ? AND meal_plan_id = ?', @recipe_id, @meal_plan_id]).first
    @delete.destroy
  end

end
