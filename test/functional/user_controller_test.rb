require 'test_helper'

class UserControllerTest < ActionController::TestCase
  test "should get email:string" do
    get :email:string
    assert_response :success
  end

end
