using CalculadoraC_.ViewModels;
using Microsoft.AspNetCore.Mvc;
using CalculadoraC_.Interfaces;
using CalculadoraC_.Services;

namespace CalculadoraC_.Controllers
{
    public class CalculadoraController : Controller
    {
        private readonly ICalculadoraService _calculadoraService;

        public CalculadoraController(ICalculadoraService calculadoraService)
        {
            _calculadoraService = calculadoraService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var modelo = new CalculadoraViewModel();

            return View(modelo);
        }

        [HttpPost]
        public IActionResult Index(CalculadoraViewModel model)
        {
            try
            {
                model.Resultado = _calculadoraService.Calcular(model.Numero1, model.Numero2, model.Operacion);
            }
            catch (DivideByZeroException ex)
            {
                ModelState.AddModelError("", ex.Message);
            }

            return View(model);
        }
        
    }
}
