$( document ).ready(function() {
	$("form", this).on("submit", function(e){
		e.preventDefault();

		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});

		var error = false;
		var msj = "";
		var nombre = $("input[name='nombre']", this).val();
		var correo = $("input[name='correo']", this).val();
		var telefono = $("input[name='telefono']", this).val();
		var servicio = $("#servicio").val();
		var mensaje = $("textarea[name='mensaje']", this).val();

		if(!error && nombre.length <= 2){ error = true;	msj = "El campo nombre es requerido";	}
		if(!error && correo.length <= 5){ error = true;	msj = "El campo correo es requerido";	}
		if(!error && telefono.length <= 7){ error = true;	msj = "El campo telefono es requerido";	}
		if(!error){
			formActions(true);
			let fecha = new Date;
			var data = {};
			data.fecha = fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString();
			data.nombre = nombre;
			data.correo = correo;
			data.telefono = telefono;
			data.servicio = servicio;
			data.mensaje = mensaje;
			
			data.utm_id = params.utm_id ? params.utm_id : "";
			data.utm_campaign = params.utm_campaign ? params.utm_campaign : "";
			data.utm_source = params.utm_source ? params.utm_source : "";
			data.utm_medium = params.utm_medium ? params.utm_medium : "";
			data.utm_content = params.utm_content ? params.utm_content : "";
			data.utm_term = params.utm_term ? params.utm_term : "";

			$.ajax({
				url: "https://hook.us2.make.com/m8koy7j3xzyoj3d93eouy9spq7y0v5yj",
				type: "POST",
				data: data,
        		dataType: "text",
				error: function(e){
					console.log(e);
					formActions(false);
				},
				success: function(result){
					formActions(false);
					console.log(result);
					if(result === "Accepted") {
						$('form').each(function() { this.reset() });
						window.open('/salud-ocupacional/gracias.html','_self')
					} else {
						alert ('Ha ocurrido un error al enviar la forma de contacto, intenta mas tarde');
					}
				}
			});
		} else {
			alert(msj);
		}
	});
    
	$("button").click(function(){
        $("input").addClass("invalid");
    });

});

function formActions(block) {
	$('input, select, button, a, textarea, checkbox').each(function () {
		$(this).attr('disabled', block);
	});
}

function closeModal(id) {
	$("#" + id).modal("hide");
}