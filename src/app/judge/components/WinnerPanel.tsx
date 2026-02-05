'use client'

export default function WinnerPanel({winners}:{winners:Record<string,any[]>}) {

  if(!Object.keys(winners).length) return null

  return (
    <div className="glass neon rounded-2xl p-8 space-y-6">

      <h2 className="text-2xl font-black">Leaderboard</h2>

      {Object.entries(winners).map(([cat,list])=>(
        <div key={cat}>

          <h3 className="font-bold text-primary mb-3">
            {cat}
          </h3>

          <div className="space-y-2">
            {list.map((w:any,i:number)=>(
              <div key={i} className="flex justify-between text-sm glass px-4 py-2 rounded-lg">
                <span>#{i+1} {w.email}</span>
                <span>{w.totalScore}</span>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  )
}
