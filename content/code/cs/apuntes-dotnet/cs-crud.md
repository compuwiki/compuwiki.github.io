## CRUD (Create Read Update Delete)

- Create = Crear, Agregar, Insertar, Registrar
- Read = Leer, Mostrar
- Update = Actualizar, Cambiar registro, Modificar
- Delete = Borrar, Eliminar

> El CRUD puede ser tanto:
>    DDL (CREATE, ALTER, DROP)
>    DML (SELECT, INSERT, UPDATE, DELETE)

En C# usamos DML ya que previamente hemos creado la estructura de la base de datos con DDL.

- Leer datos con SELECT
```cs
private void btnMostrarPaciente(object sender, RoutedEventArgs e)
{
	eleccion = "Paciente";
	string consulta = "SELECT Id, CONCAT(ID, ' - ' ,Nombre, ' ' ,Apellido1, ' ' ,Apellido2)"
	+ " AS infoPaciente FROM Paciente";
	SqlDataAdapter miAdaptadorSql = new SqlDataAdapter(consulta, miConexionSql);
	using (miAdaptadorSql)
	{
		DataTable pacientesTabla = new DataTable();
		miAdaptadorSql.Fill(pacientesTabla);
		lstboxPacienteDoctor.DisplayMemberPath = "infoPaciente";
		lstboxPacienteDoctor.SelectedValuePath = "Id";
		lstboxPacienteDoctor.ItemsSource = pacientesTabla.DefaultView;
	}
}
```

- Crear registro con INSERT
```cs
private void btnRegistrar(object sender, RoutedEventArgs e)
{
    try
    {
        string nombre = txtNombre.Text;
        string apellido1 = txtApellido1.Text;
        string apellido2 = txtApellido2.Text;
        string especialidad = cmbEspecialidades.Text;
        string consulta = "INSERT INTO Doctor (Nombre, Apellido1, Apellido2, Especialidad) " +
                          $"VALUES ('{nombre}', '{apellido1}', '{apellido2}', '{especialidad}')";
        SqlCommand miComandoSql = new SqlCommand(consulta, miConexionSql);
        miConexionSql.Open();
        miComandoSql.ExecuteNonQuery();
        miConexionSql.Close();
        MessageBox.Show("Doctor insertado correctamente!");
    }
    catch (Exception ex)
    {
        MessageBox.Show("Error al insertar el doctor: " + ex.Message);
    }
}
```

- Borrar registro con DELETE 
```cs
private void btnEliminar(object sender, RoutedEventArgs e)
{
    // MessageBox.Show(lstboxHospitalizacion.SelectedValue.ToString());
    string consulta = "DELETE FROM Hospitalizacion WHERE ID=@id_hospitalizacion";

    SqlCommand miSqlCommand = new SqlCommand(consulta, miConexionSql);
    miConexionSql.Open();
    miSqlCommand.Parameters.AddWithValue("@id_hospitalizacion", lstboxHospitalizacion.SelectedValue);
    miSqlCommand.ExecuteNonQuery();
    miConexionSql.Close();
    MessageBox.Show("Hospitalización eliminada!");
}
```

- Actualizar registro con UPDATE, pero se puede rellenar los listboxes y usar btnRegistrar

- Primero se han de rellenar los datos en los campos
```cs
public void RellenarDatos()
{
	string consulta = "SELECT Nombre, Apellido1, Fecha_Nacimiento, Telefono FROM Paciente WHERE ID=@relleno;";

    SqlCommand comandoSQL = new SqlCommand(consulta, miConexionSql);

    SqlDataAdapter miAdaptadorSql = new SqlDataAdapter(comandoSQL);

    miConexionSql.Open();
    using (miAdaptadorSql)
    {
        comandoSQL.Parameters.AddWithValue("@relleno", lstPacientes.SelectedValue);
        DataTable pacientesTabla = new DataTable();
		miAdaptadorSql.Fill(pacientesTabla);

        txtNombre.Text = pacientesTabla.Rows[0]["Nombre"].ToString();
        txtPrimerApellido.Text = pacientesTabla.Rows[0]["Apellido1"].ToString();
        txtSegundoApellido.Text = pacientesTabla.Rows[0]["Apellido2"].ToString();
        //dpFechaNamcimiento.SelectedDate = pacientesTabla.Rows[0]["Fecha_Nacimiento"];
        txtDireccion.Text = pacientesTabla.Rows[0]["Direccion"].ToString();
        txtTelefono.Text = pacientesTabla.Rows[0]["Telefono"].ToString();
        txtEmail.Text = pacientesTabla.Rows[0]["Email"].ToString();
    }
	miConexionSql.Close();
}
```

- Luego podemos actualizar el registro modificando los datos anteriores
```cs
 private void Modificar()
 {
	 try
	{
		string nombre = txtNombre.Text;
		string apellido1 = txtApellido1.Text;
		string apellido2 = txtApellido2.Text;
		string consulta = $"UPDATE Doctor SET Nombre='{nombre}', Apellido1='{apellido1}', Apellido2='{apellido2}' WHERE ID = @idDoctor;";
	using (SqlCommand command = new SqlCommand(consulta, miConexionSql))
	{
		miConexionSql.Open();
		command.Parameters.AddWithValue("@idDoctor", lstDoctores.SelectedValue);
		command.ExecuteNonQuery();
		miConexionSql.Close();    
	}
		MessageBox.Show("Doctor modificado.");
	}
	catch (Exception ex)
	{
		MessageBox.Show("Error al modificar el doctor: " + ex.Message);
	}
}

// Opción de chatGPT

private void btnModificar(object sender, RoutedEventArgs e)
{
     string query = "UPDATE Doctor SET Nombre = @Nombre, Apellido1 = @Apellido1, Apellido2 = @Apellido2 WHERE Id = @Id";

     using (SqlCommand command = new SqlCommand(query, connection))
    {
        command.Parameters.AddWithValue("@Nombre", doctor.Nombre);
        command.Parameters.AddWithValue("@Apellido1", doctor.Apellido1);
        command.Parameters.AddWithValue("@Apellido2", doctor.Apellido2);
        command.Parameters.AddWithValue("@Id", doctor.Id);

        connection.Open();
        command.ExecuteNonQuery();
    }
    
	MessageBox.Show("Tabla modificada!");
}

private void lstboxPacienteDoctor_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    // Verificar si se ha seleccionado un elemento en el ListBox
    if (lstboxPacienteDoctor.SelectedItem != null)
    {
        Paciente pacienteSeleccionado = (Paciente)lstboxPacienteDoctor.SelectedItem;

        // Asignar los valores del paciente seleccionado a los TextBox
        txtNombre.Text = pacienteSeleccionado.Nombre;
        txtApellido1.Text = pacienteSeleccionado.Apellido1;
        txtApellido2.Text = pacienteSeleccionado.Apellido2;
    }
}
```
