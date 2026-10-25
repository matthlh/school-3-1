# CPSC 310 — Lec 13 (Thu Oct 22) — REST API Design

Deck: [07b-rest-api.pdf](https://ubccpsc.github.io/310/26w1/lectures/07b-rest-api.pdf), 13 slides, posted on lecture day. Reader: [REST](https://ubccpsc.github.io/310/textbook/3-software-design/rest/), whose three sections are Nouns and Verbs, Statelessness and Design goals. Questions: 12 in [the bank](../02-questions.md) under "Lec 13". Slide 3 (the "Uber of ____" motivation for software as a service) is framing, not exam material, and is left out. Lab 1's topic already holds the status-code and PUT-idempotence basics; this page adds the design constraints. Built from the deck and the reader; Matt takes no notes in this course.

## Learning goals
- Identify the parts of an HTTP request and response.
- Model requirements as resources acted on with GET, POST, PUT and DELETE.
- Improve a design using the Uniform Interface, Idempotency, Statelessness and Connectedness constraints.
- Recognize requirements that REST models poorly.

## Slides, organized

### Two services as the running examples (slides 4 and 7)
- A weather client asks `GET /v1/forecast?city=Vancouver&days=3` with an `Accept: application/json` header and gets `200 OK`, a `Content-Type: application/json` header and a JSON body with the city and a list of days.
- A translation client sends `POST /translate` with `Accept` and `Content-Type` headers and a JSON body holding the text and the target language, and gets `200 OK` with the translated sentence as a text body.
- The two show the split the rest of the deck relies on: a GET carries everything in the URL and has no body; a POST carries its data in the body.

### Anatomy of a request (slide 5)
- A **request** has five parts: the **method**, the **path**, the **query** (the `?city=…&days=3` part of the URL), the **headers**, and the **body**, which may be empty.
- The four methods and what each one means:

| Method | Meaning | Body? |
|---|---|---|
| **GET** | Give me what is at the URL. | No |
| **PUT** | Store the given data at the URL, replacing whatever is there. | Yes |
| **POST** | Here is some data, do something with it. | Yes |
| **DELETE** | Remove what is at the URL. | No |

### Anatomy of a response (slide 6)
- A **response** has three parts: the **status**, the **headers** and the **body**.
- Status classes: **2XX** means it worked (`200 OK`, `201 Created`); **4XX** means the client's request was the problem (`400 Bad Request`, `404 Not Found`); **5XX** means the server failed (`500 Internal Server Error`).

### Scenario: campus bike share (slide 8)
- The university launches a bike share with docking stations around campus. Bikes carry printed ids (`b1`, `b2`, …). Riders use a phone app to find a station with bikes, enter a bike's id to take it, and return it at any station.
- Every later slide designs this service.

### Modelling resource operations (slide 9)
- The deck's method is a table: one row per **resource** URI, one column per method, and in each cell what that method does there or why it is refused.
- `bikes/` is a **collection**. GET returns the list of bikes, each as a URI. POST adds a bike (body: bike details) and returns the new bike's URI. PUT would replace the whole list and DELETE would delete it, neither wanted, so both answer with an error code.
- `bikes/{id}` is one bike. GET returns the bike and its sub-URIs. PUT replaces the whole bike. DELETE deletes it and returns a success code. POST has nothing to do here, so an error code or not implemented.
- `bikes/{id}/trips` is the bike's trips. GET lists them. POST could start a trip, but the deck flags the risk: POST is not idempotent. PUT does nothing. DELETE would delete every trip, so nothing.
- `bikes/{id}/trips/{id}` is one trip. GET returns it. PUT replaces the whole trip, which is how a trip ends. DELETE deletes it. POST does nothing.
- The lesson the summary draws: **model things, not actions**. URLs are resources and methods are the verbs, so an action such as taking a trip becomes a resource, the trip.

### The four RESTful design properties (slide 10)
- Each property comes with the problem it solved in the bike share and a one-line check to run on a design.

| Property | Definition | Problem it solved | Check |
|---|---|---|---|
| **Uniform Interface** | Clients act on resources using only the standard methods, which mean the same thing in every API, and status codes report the outcome. | Standard HTTP libraries work against it. | Could a generic tool handle this request correctly without knowing your API? |
| **Idempotency** | Sending a request twice leaves the same state as sending it once. Every method but POST. | Retries at the dock. | What happens if the client retries? |
| **Statelessness** | Each request carries everything needed to understand it. The server keeps the resources, not what the client has done. | A `/stations/more` endpoint. | Could a different server answer this request? |
| **Connectedness** | Responses link to related resources, so clients follow links instead of building URLs. | Changing the page size. | Does the client ever build a URL itself? |

### A RESTful bike share (slide 11)
- See which stations have bikes: `GET /stations?hasBikes=true` returns 200 with one page of stations, each with a self link, plus a next link.
- Take bike `b1`: `PUT /bikes/b1/trips/t-4f2a` with body `{"rider": "alex"}` returns 201 and the new trip, with links to its bike, rider and start station. A resend gets 200 and changes nothing.
- Return it at station `s2`: `PUT /bikes/b1/trips/t-4f2a` with the same trip plus `"end": {"station": "s2"}` returns 200 and the ended trip.
- The design uses PUT, not POST, to start the trip because the client chooses the trip id; that is what makes the retry safe.

### Where REST fits poorly (slide 12)
- Four requirements the deck calls hard to model: live dock counts on a map that update as bikes come and go; unlocking the physical dock when the rider taps "unlock"; a price quote for a ride between two stations; reserving a bike and paying for it in one step.
- The summary's grouping: REST fits things you store and change. It is awkward for pushing updates to clients, for commands to hardware, and for steps that must succeed together.

### Summary (slide 13)
- A request is a method, a URL, headers and a body; a response is a status, headers and a body.
- Model things, not actions. Actions become resources.
- Design for the network: use PUT for anything a client may resend, put the client's state in the request, and give clients links instead of making them build URLs.

## From the reader

### Nouns and verbs
- REST is an architectural style for web services that focuses on interfaces rather than implementations and uses self-descriptive messages carried over HTTP.
- Resources are nouns named by a **URI**. A URI identifies a resource without saying where on the network it lives or how to reach it: `/dataset` is a URI, `http://foo.com/dataset` is a **URL**.
- Headers carry metadata only, such as the wanted response format, the encoding or credentials. The resource goes in the URI and request data goes in the body. A body on a GET is discouraged, because the URI alone names what is wanted.
- Each request uses one verb and gets one response: a payload, usually JSON or XML, and a numeric status code.
- The verbs, with the codes the reader lists for each:
  - **GET** reads a resource and never modifies server data; repeating it has no visible effect. 200, 404.
  - **PUT** updates the resource at a known URI, and can create one when the client chooses a new URI. Idempotent. 200, 204, 404.
  - **POST** creates a resource and returns its URI. Neither safe nor idempotent. 201, 404, 409.
  - **DELETE** removes a resource. Idempotent, though a later response may differ (the second call gets 404). 200, 404.
  - **PATCH** modifies part of a resource. The reader calls it not idempotent and the least used verb. 200, 204, 404.
- JSON is preferred to XML: less verbose, easier to read, write and parse, though it has no comments.

### Statelessness
- The client, not the server, tracks session state. Any server can then answer any request, which is what makes a REST service scale.
- A response should carry enough for the client's next request, including URIs of related resources. The reader's example is GitHub's answer to creating a repository: `201 Created`, a `Location` header pointing at the new repository, and a body full of related URLs.
- Pagination follows the same rule: `GET /:query/:rowNum`, where the client says which row it wants next, not `GET /:query/next`, which would make the server remember each client's position.

### Design goals
- **Value**: the API must offer something worth having, as data, functionality or an audience.
- **Flexibility**: several data formats, protocols or versions, batch operations, and a short time to a first successful request.
- **Measuring**: track how endpoints are used and where errors happen, for the API's developers and its clients; status pages are the common form.
- **Documentation**: what the API does, its parameters and its return structure, with concrete examples.

## Clarifications
- The deck's idempotency row says "all but POST". The reader adds PATCH as not idempotent; the deck never mentions PATCH. On an exam over the deck's four methods, GET, PUT and DELETE are idempotent and POST is not.
- The deck splits Statelessness (the request carries the client's state) from Connectedness (responses carry links). The reader's Statelessness section covers both: its `/:query/next` example is the deck's `/stations/more`, and its GitHub example is Connectedness. Use the deck's two names when asked which constraint a design breaks.
- The deck's slide 11 creates the trip with PUT and a client-chosen id, while the reader's table makes POST the usual way to create. Both are right: PUT creates when the client picks the URI, POST when the server does, and the deck chooses PUT because a dock retry must not start a second trip.
