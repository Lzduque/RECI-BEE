Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # homepage cannot be '/', need controller for it
  root to: 'home#show'

  # don't need gets to these because react is rendering the forms on the same home page
  # don't symbols because we are telling the route what to do

  post '/login' => 'sessions#create'

  get '/logout' => 'sessions#destroy'

  post '/users' => 'users#create'

end