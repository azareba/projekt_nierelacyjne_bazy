# Projekt - RESTful API do zarządzania biblioteką

## Spis treści

- [Wprowadzenie](#wprowadzenie)
- [Instalacja](#instalacja)
- [Opis projektu](#opis-projektu)
- [Backend](#backend)
- [Punkty końcowe API](#punkty-końcowe-api)
  - [Rejestracja](#rejestracja)
  - [Logowanie](#logowanie)
  - [Książki](#książki)
  - [Autorzy](#autorzy)
  - [Klienci](#klienci)

### Wprowadzenie

To RESTful API zostało zbudowane przy użyciu Node.js, Express i MongoDB, umożliwiając zarządzanie książkami, autorami i klientami w bibliotece.

### Instalacja

Aby uruchomić ten projekt lokalnie, wykonaj poniższe kroki:

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/azareba/projekt_nierelacyjne_bazy.git
   ```

2. **Przejdź do katalogu projektu:**

   ```bash
   cd projekt_nierelacyjne_bazy
   ```

3. **Zainstaluj zależności:**

   ```bash
   npm install
   ```

4. **Utwórz plik `.env` i skonfiguruj zmienne środowiskowe:**

   ```env
   DB_USER=twoja_nazwa_użytkownika_bazy_danych
   DB_PASSWORD=twoje_hasło_bazy_danych
   DB_NAME=nazwa_twojej_bazy_danych
   JWT_KEY=twój_sekretny_klucz_jwt
   ```

5. **Uruchom serwer:**

   ```bash
   npm start
   ```

### Opis projektu

Projekt ten umożliwia zarządzanie książkami, autorami i klientami w bibliotece. Użytkownik (bibliotekarz) może dodawać, usuwać, aktualizować oraz przeglądać zasoby w bazie danych. System wspiera również rejestrację i logowanie użytkowników (klientów) z wykorzystaniem tokenów JWT.

### Backend

**Architektura**
- Projekt korzysta z architektury MVC (Model-View-Controller), co ułatwia organizację kodu.
- Każdy zasób (książki, autorzy, klienci) posiada własne modele, kontrolery i trasy.

**Autoryzacja**
- Uwierzytelnianie użytkowników realizowane jest przy użyciu *JSON Web Tokens (JWT)*.
- Hasła użytkowników są szyfrowane przy pomocy *bcrypt* w celu zapewnienia bezpieczeństwa.

**Baza danych**
- W projekcie wykorzystano *MongoDB Atlas* jako host bazy danych.
- Modele i schematy zostały zaimplementowane za pomocą biblioteki *mongoose*.

### Punkty końcowe API

Poniżej znajdują się najważniejsze punkty końcowe API. Wszystkie żądania wymagające autoryzacji muszą zawierać poprawny token JWT w nagłówku `Authorization`.

#### Rejestracja
**POST** `/users/rejestracja`  
Przykładowe body:
```json
{
  "mail": "przykład@email.com",
  "haslo": "twoje_hasło"
}
```
Oczekiwana odpowiedź:
```json
{
  "wiadomość": "dodano użytkownika"
}
```

#### Logowanie
**POST** `users/logowanie`  
Przykładowe body:
```json
{
  "mail": "przyklad@email.com",
  "haslo": "twoje_haslo"
}
```
Oczekiwana odpowiedź:
```json
"twój_token_jwt"
```

#### Książki
| Metoda | Trasa                      | Opis                                  |
|--------|----------------------------|---------------------------------------|
| GET    | `/ksiazki/autor_stats`               | Pobiera statystyki książek grupowane po autorze.     |
| GET    | `/ksiazki/lista`               | Pobiera listę wszystkich książek.    |
| POST   | `/ksiazki/dodaj`               | Dodaje nową książkę.                 |
| GET    | `/ksiazki/:ksiazkaId`       | Pobiera szczegóły wybranej książki.  |
| PUT    | `/ksiazki/:ksiazkaId`       | Aktualizuje informacje o książce.    |
| DELETE | `/ksiazki/:ksiazkaId`       | Usuwa książkę.                       |

#### Autorzy
| Metoda | Trasa                      | Opis                                  |
|--------|----------------------------|---------------------------------------|
| GET    | `/autorzy/lista`             | Pobiera listę wszystkich autorów.    |
| POST   | `/autorzy/dodaj`             | Dodaje nowego autora.                |
| GET    | `/autorzy/:autorId`   | Pobiera szczegóły wybranego autora.  |
| PUT    | `/autorzy/:autorId`   | Aktualizuje informacje o autorze.    |
| DELETE | `/autorzy/:autorId`   | Usuwa autora.                        |

#### Klienci
| Metoda | Trasa                      | Opis                                  |
|--------|----------------------------|---------------------------------------|
| GET    | `/klienci/wypozycz`             | Pobiera listę wszystkich wyporzyczonych książek i informacje o ich autorach.   |
| GET    | `/klienci/lista`             | Pobiera listę wszystkich klientów.   |
| POST   | `/klienci/dodaj`             | Dodaje nowego klienta.               |
| GET    | `/klienci/:klientId`   | Pobiera szczegóły wybranego klienta. |
| PUT    | `/klienci/:klientId`   | Aktualizuje informacje o kliencie.   |
| DELETE | `/klienci/:klientId`   | Usuwa klienta.                       |
