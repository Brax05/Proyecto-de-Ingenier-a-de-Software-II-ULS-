def test_root_home(app_client):
    resp = app_client.get("/")
    assert resp.status_code == 200
    data = resp.get_json()
    assert "Backend del Casino ULS" in data["mensaje"]
