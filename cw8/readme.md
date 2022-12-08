Wersja Nic się nie działo, naprawdę nic się... :
Narysuj X kulek poruszających się w dowolnym kierunku z losową prędkością
Jeśli odległość pomiędzy kulkami jest mniejsza niż Y rysuj pomiędzy nimi linię
Kulki odbijają się od krawędzi strony
Dodaj przyciski Start i Reset
Zbadaj ile jesteś w stanie wyświetlić kulek (stabilne 60fps) przy założeniu Y = 20% szerokości ekranu
X, Y jest definiowane przez użytkownika (pola tekstowe lub np. suwaki - wstępnie uzupełnione)

Przydamisie:
Rysowanie koła: ctx.arc().
Rysownie linii: ctx.beginPath(), ctx.moveTo(), ctx.lineTo()
Wypełnianie/obrysowanie kształtu: ctx.fill(), ctx.stroke()
Czyszczenie canvas: ctx.clearRect()