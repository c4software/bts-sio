package fr.brosseau.tpios.kmp

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.painterResource

import hellokmp.shared.generated.resources.Res
import hellokmp.shared.generated.resources.compose_multiplatform

@Composable
@Preview
fun App() {
    MaterialTheme {
        var compteur by remember { mutableStateOf(0) }
        val greeting = remember { Greeting().greet() }

        Surface(color = MaterialTheme.colorScheme.primaryContainer) {
            Column(
                modifier = Modifier
                    .safeContentPadding()
                    .fillMaxSize()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(24.dp, Alignment.CenterVertically),
            ) {
                Image(painterResource(Res.drawable.compose_multiplatform), null)

                Text("Bonjour BTS SIO 👋", style = MaterialTheme.typography.headlineLarge)

                Text(greeting, textAlign = TextAlign.Center)

                Button(onClick = { compteur++ }) {
                    Text("J'ai été cliqué $compteur fois")
                }

                OutlinedButton(onClick = { compteur = 0 }, enabled = compteur > 0) {
                    Text("Remettre à zéro")
                }
            }
        }
    }
}
