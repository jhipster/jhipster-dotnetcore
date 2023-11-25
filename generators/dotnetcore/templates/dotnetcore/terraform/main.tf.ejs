provider "azurerm" {
  subscription_id = var.subscription_id
  features {}
}

resource "random_uuid" "random" {
}

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-resources"
  location = var.location
}

# This creates the plan that the service use
resource "azurerm_app_service_plan" "main" {
  name                = "${var.prefix}-asp-${substr(random_uuid.random.result, 0, 5)}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }
}

# This creates the service definition
resource "azurerm_app_service" "main" {
  name                = "${var.prefix}-appservice-${substr(random_uuid.random.result, 0, 5)}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    app_command_line = ""
    linux_fx_version = "DOCKER|${var.docker_image}:${var.docker_image_tag}"
    always_on        = true
  }

  app_settings = {
  }

  connection_string {
    name  = "AppDbContext"
    type  = "SQLAzure"
    value = "Server=tcp:${azurerm_sql_server.sqldb.fully_qualified_domain_name};Database=${azurerm_sql_database.db.name};User ID=${azurerm_sql_server.sqldb.administrator_login};Password=${azurerm_sql_server.sqldb.administrator_login_password};Trusted_Connection=False;Encrypt=True;"
  }
}

resource "azurerm_sql_server" "sqldb" {
  name                         = "${var.prefix}-mssql-server"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.mssql_admin_user
  administrator_login_password = var.mssql_admin_password
}

resource "azurerm_sql_database" "db" {
  name                = "${var.prefix}_mssql_db"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  server_name         = azurerm_sql_server.sqldb.name
}

# This rule is to enable the 'Allow access to Azure services' checkbox
resource "azurerm_sql_firewall_rule" "main" {
  name                = "${var.prefix}-sql-firewall"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_sql_server.sqldb.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}