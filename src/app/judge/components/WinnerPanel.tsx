'use client'

export default function WinnerPanel({winners}:{winners:Record<string,any[]>}) {

  if(!Object.keys(winners).length) return null

  return (
    <div className="glass-dark p-6 rounded-xl space-y-6">

      <h2 className="font-bold text-xl">Category Winners</h2>

      {Object.entries(winners).map(([category,list])=>(
        <div key={category} className="space-y-2">

          <h3 className="font-semibold text-lg text-primary">
            {category}
          </h3>

          {list.map((w:any,i:number)=>(
            <div key={i}>
              #{i+1} {w.email} — {w.totalScore}
            </div>
          ))}

        </div>
      ))}

    </div>
  )
}
