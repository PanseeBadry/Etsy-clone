export default class ReviewsSection {
  static #reviews;
  static #defaultReviews;
  static #pagesNumber = 0;
  static #cardsNumber = 4;

  /**
   * Initializes the reviews section with the provided rating and review data.
   * @param {String} rating - Main product rating value
   * @param {Array<Object>} ratings - All ratings of the product
   */
  static initialize(rating, ratings) {
    // initialize static attributes
    this.#reviews = ratings ? JSON.parse(JSON.stringify(ratings)) : [];
    this.#defaultReviews = [...this.#reviews];
    this.#pagesNumber = Math.ceil(this.#reviews.length / this.#cardsNumber);

    // render header data
    document.getElementById("review-count").innerText = ratings.length;
    document.getElementById("main-prod-rating").innerHTML =
      this.#renderStars(rating);

    // render reviews cards
    this.#renderReviewCard(ratings.slice(0, this.#cardsNumber));

    // handle sort events
    const sortMenu = document.getElementsByClassName("sort-menu")[0],
      sortOptions = document.getElementsByClassName("sort-item"),
      sortButton = document.getElementsByClassName("comments-sort-button")[0],
      sortContainer = document.getElementsByClassName("reviews-sort")[0],
      sortChoice = document.getElementsByClassName("choice")[0];

    document.addEventListener("click", function (event) {
      if (!sortContainer.contains(event.target)) {
        sortMenu.classList.add("hide");
        sortButton.classList.remove("clicked");
      }
    });

    sortButton.onclick = function () {
      sortMenu.classList.toggle("hide");
      this.classList.toggle("clicked");
    };

    for (let ele of sortOptions) {
      ele.onclick = function () {
        for (let ele of sortOptions) {
          ele.classList.toggle("checked", ele === this);
        }
        sortChoice.innerText = `Sort by: ${this.innerText}`;
      };
      ele.addEventListener("click", ReviewsSection.#changePage);
    }

    // handle pagination parts
    const paginationButtons = document.getElementById("page-buttons");
    document.getElementById("prev-page").onclick = this.#changePage;
    document.getElementById("next-page").onclick = this.#changePage;
    let end = Math.min(this.#pagesNumber, 5);

    for (let i = 1; i <= end; i++) {
      let button = document.createElement("button");
      button.className = `page-btn num-btn ${i == 1 ? "active" : ""}`;
      button.addEventListener("click", this.#changePage);
      button.innerText = button.dataset.page = i;
      paginationButtons.appendChild(button);
    }
    this.#checkActive(1);
  }

  /**
   * Static method to render stars based on rating value
   * @param {String} rating - review rating value
   */
  static #renderStars(rating) {
    let fullStars = Math.floor(+rating);
    let halfStars = +rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStars;
    return (
      '<span class="star rev-icon"></span>'.repeat(fullStars) +
      '<span class="half-star rev-icon"></span>'.repeat(halfStars) +
      '<span class="empty-star rev-icon"></span>'.repeat(emptyStars)
    );
  }

  /**
   * Static method to render reviews card
   * @param {Array<Object>} revies - Part of the reviews array to be rendered
   */
  static #renderReviewCard(reviews) {
    let reviewsCard = document.getElementById("reviews-cards");
    reviewsCard.innerHTML = "";
    for (let review of reviews) {
      reviewsCard.innerHTML += ` <div class="review-card">
              <div class="review-info">
                <div class="rev-stars">
                  ${this.#renderStars(review.rating)}
                </div>
                <p class="review-content">
                  ${review.review}
                </p>
                <p class="purchased-item">
                  <strong>Purchased item:</strong>
                  <a href="#">${review.purchased_item.name}</a>
                </p>
                <div class="review-owner">
                  <img src="../assets/icons/avatar.png" class="review-image" />
                  <p class="reviewer-name">${review.reviewer.name}</p>
                  <p class="review-date">${this.#renderTime(
                    review.reviewer.date
                  )}</p>
                </div>
              </div>
              <div class="review-summary">
                <p class="review-recommend ${
                  review.recommendation ? "check" : "uncheck"
                }">
                  <span class="right">✔ </span><span class="wrong">x </span>${
                    review.recommendation ? "Recommends" : "Doesn't recommend"
                  } this item
                </p>
                <ul class="review-details">
                  <li>
                    Item quality<span class="count">${
                      review.ratings.item_quality
                    }</span
                    ><span class="star"></span>
                  </li>
                  <li>
                    Shipping<span class="count">${review.ratings.shipping}</span
                    ><span class="star"></span>
                  </li>
                  <li>
                    Customer service<span class="count">${
                      review.ratings.customer_service
                    }</span
                    ><span class="star"></span>
                  </li>
                </ul>
              </div>
            </div>`;
    }
  }

  /**
   * static method to get review time in specified format
   * @param {String} time
   */
  static #renderTime(time) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(time);
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  /**
   * Static methods to render pagination buttons
   * @param {Number} page - page number
   */
  static #renderPageButtons(page) {
    document.getElementById("prev-page").dataset.page = page - 1;
    document.getElementById("next-page").dataset.page = page + 1;
    let idx;
    if (this.#pagesNumber <= 5 || page - 2 < 1) {
      idx = 1;
    } else if (page + 2 > this.#pagesNumber) {
      idx = this.#pagesNumber - 4;
    } else {
      idx = page - 2;
    }
    for (let btn of document.getElementsByClassName("num-btn")) {
      btn.innerText = btn.dataset.page = idx++;
      btn.classList.toggle("active", +btn.innerText === page);
    }
  }

  /**
   * Method to change page current page of reviews
   * @param {Event} e
   */
  static #changePage(e) {
    if (e.target.tagName === "LI") {
      ReviewsSection.#sortCards(this.id);
    }
    let start = 4 * +this.dataset.page - 4;
    ReviewsSection.#renderReviewCard(
      ReviewsSection.#reviews.slice(start, start + 4)
    );
    document.getElementById("product-reviews").scrollIntoView({
      behavior: "smooth",
    });
    ReviewsSection.#checkActive(+this.dataset.page);
    ReviewsSection.#renderPageButtons(+this.dataset.page);
  }

  /**
   * Method to check if next and prev buttons are active
   * @param {Number} page - page number
   */
  static #checkActive(page) {
    document.getElementById("prev-page").disabled =
      page == 1 || this.#pagesNumber == 0;
    document.getElementById("next-page").disabled =
      page == this.#pagesNumber || this.#pagesNumber == 0;
  }

  /**
   * Method to sort cards
   * @param {String} id - id of the selected sort option
   */
  static #sortCards(id) {
    switch (+id) {
      case 0:
        this.#reviews = [...this.#defaultReviews];
        break;
      case 1:
        this.#reviews.sort(
          (a, b) => new Date(b.reviewer.date) - new Date(a.reviewer.date)
        );
        break;
      case 2:
        this.#reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 3:
        this.#reviews.sort((a, b) => a.rating - b.rating);
        break;
    }
  }
}
