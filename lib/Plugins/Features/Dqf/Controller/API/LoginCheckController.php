<?php

namespace Features\Dqf\Controller\API;

use Features\Dqf\Service\Client ;

class LoginCheckController extends \API\V2\KleinController {

    public function check() {
        $email = $this->request->email ;

    }

}