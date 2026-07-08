/**
 * Calculadora PRO MAX ULTRA
 * Funcionalidades avanzadas
 */

(function () {
    'use strict';

    // ===== CONFIGURACIÓN =====
    const CONFIG = {
        MAX_HISTORY: 5,
        STORAGE_KEY: 'calcHistory'
    };

    // ===== ELEMENTOS DOM =====
    const DOM = {
        form: document.getElementById('calculatorForm'),
        resultInput: document.getElementById('resultInput'),
        historyContainer: document.getElementById('quickHistory'),
        num1Input: document.querySelector('[name="Numero1"]'),
        num2Input: document.querySelector('[name="Numero2"]'),
        operationSelect: document.querySelector('[name="Operacion"]'),
        calculateBtn: document.querySelector('.btn-calculate')
    };

    // ===== INICIALIZACIÓN =====
    document.addEventListener('DOMContentLoaded', function () {
        // Cargar historial guardado
        updateHistoryDisplay();

        // Si hay resultado, guardar en historial
        if (DOM.resultInput && DOM.resultInput.value) {
            saveCurrentResult();
        }

        // Event Listeners
        if (DOM.form) {
            DOM.form.addEventListener('submit', handleFormSubmit);
        }

        // Atajos de teclado
        document.addEventListener('keydown', handleKeyboardShortcuts);

        console.log('🚀 Calculadora PRO MAX ULTRA inicializada');
    });

    // ===== FUNCIONES PRINCIPALES =====

    /**
     * Manejar el envío del formulario
     */
    function handleFormSubmit(e) {
        // Validar campos antes de enviar
        if (!validateForm()) {
            e.preventDefault();
            return;
        }

        // Guardar resultado después del envío
        setTimeout(function () {
            saveCurrentResult();
        }, 200);
    }

    /**
     * Validar formulario antes de enviar
     */
    function validateForm() {
        const num1 = parseFloat(DOM.num1Input.value);
        const num2 = parseFloat(DOM.num2Input.value);
        const operation = DOM.operationSelect.value;

        // Validar números
        if (isNaN(num1) || isNaN(num2)) {
            showError('Por favor, ingresa números válidos');
            return false;
        }

        // Validar operación
        if (!operation) {
            showError('Por favor, selecciona una operación');
            return false;
        }

        // Validar división por cero
        if (operation === '/' && num2 === 0) {
            showError('❌ No se puede dividir entre cero');
            return false;
        }

        clearError();
        return true;
    }

    /**
     * Guardar el resultado actual en el historial
     */
    function saveCurrentResult() {
        const result = DOM.resultInput.value;
        if (!result || result === '') return;

        const num1 = DOM.num1Input.value;
        const num2 = DOM.num2Input.value;
        const op = DOM.operationSelect.value;
        const opSymbol = getOperationSymbol(op);

        if (num1 && num2 && op) {
            const operationText = `${num1} ${opSymbol} ${num2}`;
            saveToHistory(operationText, result);
            updateHistoryDisplay();

            // Activar animación del resultado
            const resultDisplay = DOM.resultInput.closest('.result-display');
            if (resultDisplay) {
                resultDisplay.classList.add('result-active');
            }
        }
    }

    /**
     * Obtener símbolo de operación
     */
    function getOperationSymbol(op) {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷',
            '%': '%',
            '^': '^'
        };
        return symbols[op] || op;
    }

    // ===== HISTORIAL =====

    /**
     * Guardar en historial (localStorage)
     */
    function saveToHistory(operation, result) {
        const history = getHistory();
        const entry = {
            operation: operation,
            result: result,
            timestamp: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };

        history.unshift(entry);
        if (history.length > CONFIG.MAX_HISTORY) {
            history.pop();
        }

        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history));
    }

    /**
     * Obtener historial
     */
    function getHistory() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn('Error al leer historial:', e);
            return [];
        }
    }

    /**
     * Actualizar la visualización del historial
     */
    function updateHistoryDisplay() {
        const history = getHistory();

        if (!DOM.historyContainer) return;

        if (history.length === 0) {
            DOM.historyContainer.innerHTML = `
                <span class="history-label">📊 Últimos cálculos:</span>
                <span class="history-empty">(Los resultados aparecerán aquí)</span>
            `;
            return;
        }

        let html = `<span class="history-label">📊 Últimos cálculos:</span>`;
        history.forEach(function (item) {
            html += `
                <span class="history-item" title="${item.date} ${item.timestamp}">
                    ${item.operation} = ${item.result}
                </span>
            `;
        });
        DOM.historyContainer.innerHTML = html;
    }

    /**
     * Limpiar historial
     */
    function clearHistory() {
        if (confirm('¿Borrar todo el historial de cálculos?')) {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            updateHistoryDisplay();
            showNotification('🗑️ Historial borrado');
        }
    }

    // ===== UTILIDADES =====

    /**
     * Mostrar errores
     */
    function showError(message) {
        clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger-modern error-summary';
        errorDiv.id = 'customError';
        errorDiv.innerHTML = `<span style="font-size:1.2rem;">⚠️</span> ${message}`;

        const form = DOM.form;
        if (form) {
            form.insertBefore(errorDiv, form.querySelector('.button-group'));
        }
    }

    /**
     * Limpiar errores
     */
    function clearError() {
        const existingError = document.getElementById('customError');
        if (existingError) {
            existingError.remove();
        }
    }

    /**
     * Mostrar notificación temporal
     */
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,212,255,0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            font-weight: 600;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        `;
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(function () {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.3s ease';
            setTimeout(function () {
                notif.remove();
            }, 300);
        }, 2000);
    }

    // ===== FUNCIONES GLOBALES =====

    /**
     * Resetear calculadora (expuesta globalmente)
     */
    window.resetCalculator = function () {
        if (DOM.form) {
            DOM.form.reset();
        }
        if (DOM.resultInput) {
            DOM.resultInput.value = '';
            const resultDisplay = DOM.resultInput.closest('.result-display');
            if (resultDisplay) {
                resultDisplay.classList.remove('result-active');
            }
        }
        clearError();

        // Enfoque en el primer input
        if (DOM.num1Input) {
            setTimeout(function () {
                DOM.num1Input.focus();
            }, 100);
        }
    };

    /**
     * Limpiar historial (expuesta globalmente)
     */
    window.clearHistory = clearHistory;

    // ===== ATAJOS DE TECLADO =====

    /**
     * Manejar atajos de teclado
     */
    function handleKeyboardShortcuts(e) {
        // Ctrl + Enter: Enviar formulario
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (DOM.form) {
                DOM.form.submit();
            }
        }

        // Escape: Resetear
        if (e.key === 'Escape') {
            window.resetCalculator();
        }

        // Ctrl + H: Mostrar historial
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            alert('📊 Historial de cálculos:\n' +
                getHistory().map(function (item, index) {
                    return `${index + 1}. ${item.operation} = ${item.result} (${item.timestamp})`;
                }).join('\n') || 'Sin cálculos registrados');
        }
    }

    // ===== ANIMACIONES ADICIONALES =====

    /**
     * Efecto de confeti al obtener resultado (opcional)
     */
    function showCelebration() {
        // Solo si el resultado es positivo y no es error
        const result = parseFloat(DOM.resultInput.value);
        if (!isNaN(result) && result > 0) {
            // Pequeña animación de celebración
            DOM.resultInput.style.transform = 'scale(1.05)';
            setTimeout(function () {
                DOM.resultInput.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Exportar funciones útiles para debugging
    window.__calculator = {
        getHistory: getHistory,
        clearHistory: clearHistory,
        resetCalculator: window.resetCalculator,
        version: '2.0.0'
    };

    console.log('📊 Historial actual:', getHistory());

})();