// app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEZIONE DEGLI ELEMENTI DEL DOM ---
    const formContainer = document.getElementById('form-container');

    // --- 2. TEMPLATE HTML PER LE VARIE VISTE ---
    // Usiamo i template literals (`) per creare blocchi di HTML riutilizzabili.

    const loginView = `
        <h2>Fai già parte del nostro team?</h2>
        <div class="error-message" id="error-message"></div>
        <form id="login-form">
            <input type="email" placeholder="E-mail" required value="test@ainana.com">
            <input type="password" placeholder="Password" required value="password123">
            <div class="form-options">
                <label><input type="checkbox"> Ricordami</label>
                <a href="#" data-view="forgotPassword">Hai dimenticato la password?</a>
            </div>
            <button type="submit" class="button-yellow">Accedi</button>
        </form>
        <p class="register-text">Non hai un account? <a href="#" data-view="register">Registrati</a></p>
    `;

    const registerView = `
        <h2>Crea il tuo account Ainana</h2>
        <div class="error-message" id="error-message"></div>
        <form id="register-form">
            <input type="text" placeholder="Nome" required>
            <input type="text" placeholder="Cognome" required>
            <input type="email" placeholder="E-mail" required>
            <input type="password" placeholder="Password" required>
            <button type="submit" class="button-yellow">Registrati</button>
        </form>
        <p class="register-text">Hai già un account? <a href="#" data-view="login">Accedi</a></p>
    `;
    
    const forgotPasswordView = `
        <h2>Recupera la tua password</h2>
        <p style="font-size:14px; text-align:center; margin-bottom:16px;">Inserisci la tua email e ti invieremo un link per resettarla.</p>
        <div class="error-message" id="error-message"></div>
        <form id="forgot-password-form">
            <input type="email" placeholder="E-mail" required>
            <button type="submit" class="button-yellow">Invia link di recupero</button>
        </form>
        <p class="register-text"><a href="#" data-view="login">Torna al Login</a></p>
    `;

    const validationCodeView = `
        <h2>Un ultimo passaggio!</h2>
        <p style="font-size:14px; text-align:center; margin-bottom:16px;">Inserisci il codice di validazione che ti è stato fornito per attivare il tuo account.</p>
        <div class="error-message" id="error-message"></div>
        <form id="validation-code-form">
            <input type="text" placeholder="Codice di validazione" required>
            <button type="submit" class="button-yellow">Attiva Account</button>
        </form>
        <p class="register-text"><a href="#">Non hai un codice? Contattaci</a></p>
    `;
    
    const successMessageView = (message) => `
        <div style="text-align: center; padding: 20px 0;">
            <h2 style="margin-bottom: 10px;">✅ Fatto!</h2>
            <p>${message}</p>
            <a href="#" data-view="login" style="margin-top: 20px; display:inline-block;">Torna al Login</a>
        </div>
    `;


    // --- 3. FUNZIONE PER RENDERIZZARE LA VISTA CORRETTA ---
    const render = (view) => {
        switch (view) {
            case 'register':
                formContainer.innerHTML = registerView;
                break;
            case 'forgotPassword':
                formContainer.innerHTML = forgotPasswordView;
                break;
            case 'validationCode':
                formContainer.innerHTML = validationCodeView;
                break;
            case 'login':
            default:
                formContainer.innerHTML = loginView;
        }
    };


    // --- 4. GESTIONE DEI CLICK (NAVIGAZIONE TRA LE VISTE) ---
    // Usiamo l'event delegation per gestire tutti i click all'interno del contenitore.
    formContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.view) {
            e.preventDefault();
            render(e.target.dataset.view);
        }
    });


    // --- 5. GESTIONE DEI SUBMIT DEI FORM ---
    // Qui simuliamo le chiamate al backend.
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const errorMessage = form.parentNode.querySelector('#error-message');

        // Mostra stato di caricamento
        submitButton.classList.add('loading');
        errorMessage.style.display = 'none';

        // --- SIMULAZIONE CHIAMATA AL BACKEND ---
        setTimeout(() => {
            // Rimuovi stato di caricamento
            submitButton.classList.remove('loading');

            // Logica specifica per ogni form
            if (form.id === 'login-form') {
                const email = form.querySelector('input[type="email"]').value;
                if (email === 'test@ainana.com') { // Simula successo
                    window.location.href = "https://ainana-cm.vercel.app";
                } else { // Simula fallimento
                    errorMessage.textContent = 'Email o password non corretti. Riprova.';
                    errorMessage.style.display = 'block';
                }
            } 
            
            else if (form.id === 'register-form') {
                 // Dopo la registrazione, mostra la vista per il codice
                render('validationCode');
            } 
            
            else if (form.id === 'validation-code-form') {
                const code = form.querySelector('input[type="text"]').value;
                if (code.toLowerCase() === 'nana01') { // Simula codice corretto
                    console.log("Codice corretto, login automatico e redirect...");
                    window.location.href = "https://ainana-cm.vercel.app";
                } else { // Simula codice errato
                    errorMessage.textContent = 'Codice non valido o già utilizzato. Riprova.';
                    errorMessage.style.display = 'block';
                }
            }

            else if (form.id === 'forgot-password-form') {
                // Mostra sempre un messaggio di successo per sicurezza
                formContainer.innerHTML = successMessageView('Se un account con questa email esiste, abbiamo inviato le istruzioni per il recupero.');
            }

        }, 1500); // Ritardo di 1.5 secondi per simulare la rete
    });

    // --- 6. AVVIO ---
    // Renderizza la vista di login all'inizio
    render('login');

});