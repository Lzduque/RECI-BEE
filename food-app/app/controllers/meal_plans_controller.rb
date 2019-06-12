class MealPlansController < ApplicationController
  # before_filter :new_meal_plan, :only => [:create]

  def index

    @user_id = 1
    @meal_plan_date = Time.zone.today
    @meal_plan = MealPlan.where(["user_id = ? AND meal_plan_date = ?", @user_id, @meal_plan_date])
    render :json => @meal_plan.to_json(:include => {meal_plan_recipes: {:include => {recipe: {:include => {ingredients: {include: :quantities}}}}}})

  end

  def create
    puts "create method"

    @user_id = 1
    @meal_plan_date = Time.zone.today

    @mealPlanParams = { "user_id" => @user_id,  "meal_plan_date" => Time.zone.today }

    @meal_plan = MealPlan.new(@mealPlanParams)

  if MealPlan.where(['meal_plan_date = ? AND user_id = ?', @meal_plan_date, @user_id]).first
      render status: 400, json: { error: 'Meal Plan already exists to this user in DB!' }
    elsif @meal_plan.save
      render status: 200, json: @meal_plan
    else
      render status: 400, json: { error: 'Expected parameter `recipe_id and meal_type`' }
    end

    @meal_plan_search = MealPlan.where(['meal_plan_date = ? AND user_id = ?', @meal_plan_date, @user_id]).first
    @recipe_id = params[:recipe_id]

    @mealPlanRecipeParams = { "meal_plan_id" => @meal_plan_search.id,  "recipe_id" => @recipe_id }

    @meal_plan_recipe = MealPlanRecipe.new(@mealPlanRecipeParams)

    @meal_plan_recipe.save
  end

  def destroy
    puts "destroy method"

    @recipe_id = params[:recipe_id]
    @meal_plan_id = params[:id]

    @delete = MealPlanRecipe.where(['recipe_id = ? AND meal_plan_id = ?', @recipe_id, @meal_plan_id]).first
    @delete.destroy
  end

end
