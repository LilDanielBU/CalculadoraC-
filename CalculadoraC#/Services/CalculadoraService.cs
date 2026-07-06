using CalculadoraC_.Interfaces;
using CalculadoraC_.ViewModels;

namespace CalculadoraC_.Services
{
    public class CalculadoraService : ICalculadoraService
    {

        public double Calcular(
    double numero1,
    double numero2,
    string operacion)
        {
            switch (operacion)
            {
                case "+":
                    return numero1 + numero2;

                case "-":
                    return numero1 - numero2;

                case "*":
                    return numero1 * numero2;
                case "/":
                    if (numero2 == 0)
                    {
                        throw new DivideByZeroException("No se puede dividir entre cero.");
                    }
                    return numero1 / numero2;
            }
            return 0;
        }
}
}
