---
title: Verbs of Computing
description: Computing as a hierarchy of verbs, from logic gates to deployment, each built from simpler ones. Includes an interactive map of 50 verbs.
created: 2026-11-22
tags: [concept, fundamentals, diagram, philosophy]
---

> "In the beginning was the Word, and the Word was with God, and the Word was God." — John 1:1
>
> "And God said, Let there be light: and there was light." — Genesis 1:3
>
> "I AM THAT I AM." — Exodus 3:14 (the divine name *Ehyeh* is a verb: "I will be")

## What it is

In this view, everything a computer does is a **verb**. A small set of primitive verbs (compare, add, store) is built straight into the logic gates. Every other verb is defined in terms of simpler ones. For example, *read* is built on *move* and *store*. *Back up* is built on *read*, *compress* and *send*. *Compile* is built on *read*, *translate* and *write*.

In the scriptures above, creation happens through speech: God *says* and things *are*. Computing works the same way. A program is a sequence of verbs, and running it brings that sequence into being.

## Interactive map

Click a verb to see what it means, who acts as client, server and API, its Bash and PowerShell commands, the chain of verbs it is built from down to the gates, and the wiki pages that cover it. Switch between **Layers** and **Families**, or use the **Body** lens.

<iframe src="./verbs-of-computing-map.html" title="Verbs of Computing interactive map" style="width:100%;height:85vh;min-height:620px;border:1px solid var(--lightgray);border-radius:8px"></iframe>

<a href="./verbs-of-computing-map.html" data-router-ignore>Open the map full screen</a> (English / Español, follows the wiki's dark/light theme).

## Key ideas

- **Verbs compose.** Each verb is defined only in terms of verbs below it, so the whole system forms a directed graph with a few primitive verbs at the bottom. A verb's *level* is the length of its longest chain down to the gates.
- **The same verbs repeat at every scale.** *Move* is a CPU instruction, a file operation, a network packet and an HTTP request. *Read* is a syscall, an HTTP `GET` and a SQL `SELECT`.
- **Nouns are just state.** Files, records and packets are what the verbs leave behind.
- **Interfaces name their verbs.** PowerShell's approved verbs (`Get`, `Set`, `New`, `Remove`…), HTTP methods and CRUD are all small, fixed vocabularies of verbs.

## The body lens

The map can also be read as a body: the same structure repeats at every scale, like cells → tissues → organs → organism.

| Machine  | logic gate | circuit | component (CPU, disk) | computer | network of computers |
|----------|------------|---------|-----------------------|----------|----------------------|
| **Body** | cell       | tissue  | organ                 | organism | society              |

The network acts as the circulatory system: cables are vessels, packets are blood cells carrying cargo, routers are branches and valves, the firewall is the immune system at the border, and DNS works like the receptors that tell each hormone which organ it is for. See also [Organic Life vs Artificial Life](../../essays/organic-vs-artificial-life.md).

## Verb index

Each verb links to its card in the map. *Level* is the number of steps down to the logic gates.

<!-- verb-index:start -->

### Logic & hardware

*AND, OR, NOT gates and flip-flops: what the CPU does in one cycle.* Body lens: Cells.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#comparar" data-router-ignore>compare</a> | 0 | logic gates | Decide whether two values are equal, or which is greater. Built from XOR and NOT gates. | `Compare` |
| <a href="./verbs-of-computing-map.html#sumar" data-router-ignore>add</a> | 0 | logic gates | Combine two numbers into one. A full adder is two XOR, two AND and one OR gate. | `Measure` |
| <a href="./verbs-of-computing-map.html#almacenar" data-router-ignore>store</a> | 0 | logic gates | Hold a bit over time. A flip-flop is a set of gates wired back into themselves. | `Set` |
| <a href="./verbs-of-computing-map.html#mover" data-router-ignore>move</a> | 1 | store | Copy bits from one location to another over a bus. | `Move` |

### Operating system

*The kernel shares CPU, memory and disk among processes.* Body lens: Nervous system & metabolism.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#leer" data-router-ignore>read</a> | 2 | move, store | Get data without changing it. The R in CRUD. | `Get` |
| <a href="./verbs-of-computing-map.html#escribir" data-router-ignore>write</a> | 2 | move, store | Leave data saved at a destination. The basis of create, update and delete. | `Set` |
| <a href="./verbs-of-computing-map.html#ejecutar" data-router-ignore>run</a> | 3 | read, compare, add | Load a program and make the CPU follow its instructions. | `Start` |
| <a href="./verbs-of-computing-map.html#montar" data-router-ignore>mount</a> | 3 | read | Make a disk or network share appear as just another folder. | `New` |
| <a href="./verbs-of-computing-map.html#interrumpir" data-router-ignore>interrupt</a> | 1 | compare, store | Stop what the CPU is doing to handle something urgent, then resume exactly where it left off. | `Stop` |
| <a href="./verbs-of-computing-map.html#planificar" data-router-ignore>schedule</a> | 2 | interrupt, compare | Decide which task uses the CPU and when, or set something to run later. | `Register` |
| <a href="./verbs-of-computing-map.html#virtualizar" data-router-ignore>virtualize</a> | 4 | run, interrupt, mount | Make one physical machine look like several independent machines. | `New` |

### Network

*Moving bits between machines: packets, ports and names.* Body lens: Circulatory system.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#enviar" data-router-ignore>send</a> | 3 | write, encode | Push data out of one machine toward another. | `Invoke` |
| <a href="./verbs-of-computing-map.html#recibir" data-router-ignore>receive</a> | 4 | read, decode | Accept data arriving over the network. | `Invoke` |
| <a href="./verbs-of-computing-map.html#enrutar" data-router-ignore>route</a> | 4 | compare, send | Choose which way a packet goes based on its destination. | `New` |
| <a href="./verbs-of-computing-map.html#resolver" data-router-ignore>resolve</a> | 5 | send, receive, search | Turn a domain name into an IP address. | `Resolve` |
| <a href="./verbs-of-computing-map.html#autenticar" data-router-ignore>authenticate</a> | 4 | compare, encrypt | Check that someone is who they claim to be. | `Enter` |
| <a href="./verbs-of-computing-map.html#autorizar" data-router-ignore>authorize</a> | 5 | authenticate, compare | Decide what someone whose identity is already verified may do. | `Grant` |
| <a href="./verbs-of-computing-map.html#filtrar" data-router-ignore>filter</a> | 5 | compare, receive | Let through only the traffic that meets a set of rules. | `New` |
| <a href="./verbs-of-computing-map.html#balancear" data-router-ignore>load-balance</a> | 5 | route, compare | Spread requests across several servers so none gets overloaded. | `Add` |

### Data

*Storing and querying structured information.* Body lens: Memory & DNA.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#crear" data-router-ignore>create</a> | 3 | write | Add a record that did not exist. The C in CRUD. | `New` |
| <a href="./verbs-of-computing-map.html#actualizar" data-router-ignore>update</a> | 3 | read, write | Change an existing record. The U in CRUD. | `Set` |
| <a href="./verbs-of-computing-map.html#eliminar" data-router-ignore>delete</a> | 3 | write | Remove a record. The D in CRUD. | `Remove` |
| <a href="./verbs-of-computing-map.html#buscar" data-router-ignore>search</a> | 3 | read, compare | Read only what meets a condition. | `Select` |
| <a href="./verbs-of-computing-map.html#indexar" data-router-ignore>index</a> | 3 | read, compare, write | Build an ordered shortcut to search faster. | `Invoke` |
| <a href="./verbs-of-computing-map.html#cachear" data-router-ignore>cache</a> | 4 | store, search | Keep a nearby copy of what is used often so you don't fetch it from far away. | — |
| <a href="./verbs-of-computing-map.html#respaldar" data-router-ignore>back up</a> | 5 | read, compress, send | Copy data elsewhere so it can be recovered later. | `Backup` |
| <a href="./verbs-of-computing-map.html#restaurar" data-router-ignore>restore</a> | 6 | back up, write | Recover data from a backup. | `Restore` |
| <a href="./verbs-of-computing-map.html#replicar" data-router-ignore>replicate</a> | 4 | read, send, write | Keep live copies of data in several places at once. | `Enable` |
| <a href="./verbs-of-computing-map.html#versionar" data-router-ignore>version</a> | 1 | compare, store | Save each change as a version you can view or go back to. | `Checkpoint` |
| <a href="./verbs-of-computing-map.html#validar" data-router-ignore>validate</a> | 1 | compare | Check that data follows the rules before accepting it. | `Test` |
| <a href="./verbs-of-computing-map.html#cifrar" data-router-ignore>encrypt</a> | 3 | add, encode | Transform data so only someone with the key can read it. | `Protect` |

### Transformation

*Changing the shape of data without changing its meaning.* Body lens: Digestion.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#codificar" data-router-ignore>encode</a> | 2 | move | Represent information with an agreed code: letters as bytes, images as numbers. | — |
| <a href="./verbs-of-computing-map.html#decodificar" data-router-ignore>decode</a> | 3 | read | Go from the code back to the original information. | — |
| <a href="./verbs-of-computing-map.html#serializar" data-router-ignore>serialize</a> | 3 | encode | Turn an in-memory object into a sequence of bytes you can save or send. | `ConvertTo` |
| <a href="./verbs-of-computing-map.html#traducir" data-router-ignore>translate</a> | 4 | decode, encode | Go from one language to another keeping the meaning. | — |
| <a href="./verbs-of-computing-map.html#compilar" data-router-ignore>compile</a> | 5 | read, translate, write | Translate all source code into machine code before running it. | — |
| <a href="./verbs-of-computing-map.html#convertir" data-router-ignore>convert</a> | 4 | decode, encode | Change the format of data: decode one, encode another. | `ConvertTo` |
| <a href="./verbs-of-computing-map.html#comprimir" data-router-ignore>compress</a> | 4 | encode, search | Encode with fewer bits by finding repetition. | `Compress` |
| <a href="./verbs-of-computing-map.html#hashear" data-router-ignore>hash</a> | 3 | add, encode | Compute a short, unique fingerprint of any data. It cannot be undone. | `Get` |
| <a href="./verbs-of-computing-map.html#importar" data-router-ignore>import</a> | 5 | read, convert, create | Bring outside data into your system. | `Import` |
| <a href="./verbs-of-computing-map.html#exportar" data-router-ignore>export</a> | 5 | read, convert, write | Take data out of your system in a format others understand. | `Export` |

### Application

*What the end user sees and asks for.* Body lens: Organism & behavior.

| Verb | Level | Built from | Meaning | PowerShell |
|---|---|---|---|---|
| <a href="./verbs-of-computing-map.html#reproducir" data-router-ignore>play</a> | 5 | receive, decode | Decode audio or video and send it to screen or speaker at its own pace. | `Start` |
| <a href="./verbs-of-computing-map.html#sincronizar" data-router-ignore>sync</a> | 5 | compare, send, receive, update | Make two copies identical by sending only the differences. | — |
| <a href="./verbs-of-computing-map.html#desplegar" data-router-ignore>deploy</a> | 6 | compile, send, run | Put a new version of a program into service on the server. | — |
| <a href="./verbs-of-computing-map.html#publicar" data-router-ignore>publish</a> | 4 | create, send | Make something available for others to read. | `Publish` |
| <a href="./verbs-of-computing-map.html#monitorizar" data-router-ignore>monitor</a> | 3 | read, compare, schedule | Measure a system's state nonstop and alert when something goes off normal. | `Get` |
| <a href="./verbs-of-computing-map.html#registrar" data-router-ignore>log</a> | 3 | write | Note what happened and when, so it can be reviewed later. | `Write` |
| <a href="./verbs-of-computing-map.html#notificar" data-router-ignore>notify</a> | 4 | send | Tell someone that something happened without them having to ask. | `Invoke` |
| <a href="./verbs-of-computing-map.html#escalar" data-router-ignore>scale</a> | 7 | deploy, load-balance, monitor | Add or remove resources to match the load. | `Set` |
| <a href="./verbs-of-computing-map.html#migrar" data-router-ignore>migrate</a> | 6 | export, import, convert | Move data or services from one system to another without losing them. | `Move` |

<!-- verb-index:end -->

## Extending the map

The map is split into four files in this folder:

| File | What it holds |
|---|---|
| `verbs.json` | The data: layers, families and verbs (Spanish and English text, commands, client/server/API roles, body lens, `base` verbs it is built from, `wiki` pages that cover it) |
| `verbs-of-computing-map.html` | Page structure only |
| `verbs-of-computing-map.css` | Styles, light/dark themes and the embedded layout |
| `verbs-of-computing-map.js` | UI strings (ES/EN), drawing the map and the verb card, theme sync with the wiki |

To add or change a verb, edit `verbs.json`. Then run `node scripts/gen-verb-index.mjs` from `compuwiki-website/` to check the data (unknown verbs, layers, families or wiki pages) and regenerate the verb index above. The map loads `verbs.json` with `fetch`, so it must be opened through a web server (the wiki or `pnpm serve`), not straight from disk.

## References

- John 1:1–3; Genesis 1:3; Exodus 3:14
- PowerShell [approved verbs](https://learn.microsoft.com/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands)
- [HTTP](../../cheatsheets/protocols/http.md) methods and CRUD (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Related: [Operating System Layer Stack](../os-layer-stack.md), [OSI Model](../osi-model.md), [APIs](../api.md), [Turing-Complete: A Discovery Inherent to Reality](../../essays/turing-complete-reality.md)
