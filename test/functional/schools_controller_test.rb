require 'test_helper'

class SchoolsControllerTest < ActionController::TestCase
  test "should get school" do
    get :school
    assert_response :success
  end

end
