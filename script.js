function showTab(chain) {
  document.querySelectorAll('.tab-content').forEach(div => {
    div.style.display = 'none';
  });
  document.getElementById(chain).style.display = 'block';
}

function getExplorerUrl(chain, address) {
  if (chain === 'eth') return `https://etherscan.io/address/${address}`;
  if (chain === 'btc') return `https://www.blockchain.com/btc/address/${address}`;
  if (chain === 'sol') return `https://solscan.io/account/${address}`;
}

fetch('whales.json')
  .then(res => res.json())
  .then(data => {
    ['eth', 'btc', 'sol'].forEach(chain => {
      const container = document.getElementById(chain);
      const txs = data[chain] || [];
      if (txs.length === 0) {
        container.innerHTML = `<p>No whale activity for ${chain.toUpperCase()}.</p>`;
        return;
      }
      container.innerHTML = '';
      txs.forEach(tx => {
        const div = document.createElement('div');
        div.className = 'tx';
        div.innerHTML = `
          <a href="${getExplorerUrl(chain, tx.address)}" target="_blank">${tx.address}</a>
          <span>Amount: ${tx.amount} ${chain.toUpperCase()} (${tx.usd} USD)</span>
          <span>Type: ${tx.type}</span>
          <span>Time: ${tx.time}</span>
        `;
        container.appendChild(div);
      });
    });
  })
  .catch(() => {
    document.querySelectorAll('.tab-content').forEach(div => {
      div.innerHTML = '<p>Error loading data.</p>';
    });
  });