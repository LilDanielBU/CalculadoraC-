using CalculadoraC_.ViewModels;

namespace CalculadoraC_.Interfaces
{
    public interface ICalculadoraService
    {
        public double Calcular(double numero1,double numero2,string operacion);
    }
}
