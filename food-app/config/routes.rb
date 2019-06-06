Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # '/' -> index.html?

  # root to: 'recipes#index'

  scope '/api' do

    get '/books/search' => 'books#search'
    get '/recipes/search' => 'recipes#search'

    # resources :users
    resources :ingredients, only: [:index]
    resources :secrets, only: [:index]
    resources :recipes, only: [:index, :create]
    resources :books, only: [:index, :show, :create, :destroy]
    resources :meal_plans, only: [:index, :create, :destroy]
  end
end
