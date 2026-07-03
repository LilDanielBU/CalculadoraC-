using CalculadoraC_.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CalculadoraC_.Controllers
{
    public class CalculadoraController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var modelo = new CalculadoraViewModel();

            return View(modelo);
        }

        [HttpPost]
        public IActionResult Index(CalculadoraViewModel model)
        {
            switch (model.Operacion)
            {
                case "suma":
                    model.Resultado = model.Numero1 + model.Numero2;
                    break;
                case "resta":
                    model.Resultado = model.Numero1 - model.Numero2;
                    break;
                case "multiplicacion":
                    model.Resultado = model.Numero1 * model.Numero2;
                    break;
                case "division":
                    if (model.Numero2 != 0)
                    {
                        model.Resultado = model.Numero1 / model.Numero2;
                    }
                    break;
            }

            return View(model);
        }
    }
}