# We’re done with the API, but where will we render React? Let’s build a static view where the application will lead us. First, we’ll have to create a controller that’s solely responsible for rendering the static view.

class SiteController < ApplicationController
  def index
  end
end
