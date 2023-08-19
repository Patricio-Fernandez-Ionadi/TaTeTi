import { Square } from "./Square"

export function WinnerModal ({winner, actionbutton}){
  if (winner === null) return null

  const winnerText = winner === false
  ? 'Empate'
  : `Gano ${winner}`
    return (
        <section>
        {
            <section className="winner">
              <div className="text">
                <h2>{winnerText}</h2>
                
                <header className="win">
                  {winner && <Square isSelected={true}>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={actionbutton}>Emepzar Otro Juego</button>
                </footer>
              </div>
            </section> 
        }
      </section>
    )
}