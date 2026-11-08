import SwiftUI

struct ContentView: View {
    @State private var compteur = 0
    @State private var prenom = ""

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "iphone")
                .font(.system(size: 64))
                .foregroundStyle(.tint)

            Text(prenom.isEmpty ? "Bonjour BTS SIO 👋" : "Bonjour \(prenom) 👋")
                .font(.largeTitle)
                .bold()

            TextField("Votre prénom", text: $prenom)
                .textFieldStyle(.roundedBorder)

            Button("J'ai été cliqué \(compteur) fois") {
                compteur += 1
            }
            .buttonStyle(.borderedProminent)

            Button("Remettre à zéro", role: .destructive) {
                compteur = 0
            }
            .disabled(compteur == 0)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
